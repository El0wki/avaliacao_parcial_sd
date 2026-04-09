class Monitor {
  private locked: boolean = false;
  private waitQueue: (() => void)[] = [];

  async enter(): Promise<void> {
    if (!this.locked) {
      this.locked = true;
      return;
    }
    await new Promise<void>((resolve) => this.waitQueue.push(resolve));
  }

  exit(): void {
    if (this.waitQueue.length > 0) {
      const next = this.waitQueue.shift();
      if (next) next();
    } else {
      this.locked = false;
    }
  }
}

export default Monitor;
