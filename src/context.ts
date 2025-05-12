/**
 * Enhanced test context that provides a more intuitive API for working with test values
 */
class Context {
  private _values = new Map<string, any>();

  /**
   * Set a value in the test context
   */
  set(key: string, value: any): void {
    this._values.set(key, value);
  }

  /**
   * Get a value from the test context
   */
  get<T = any>(key: string): T {
    return this._values.get(key);
  }

  /**
   * Check if a key exists in the test context
   */
  has(key: string): boolean {
    return this._values.has(key);
  }

  /**
   * Delete a value from the test context
   */
  delete(key: string): boolean {
    return this._values.delete(key);
  }

  /**
   * Clear all values from the test context
   */
  clear(): void {
    this._values.clear();
  }

  /**
   * Get all keys in the test context
   */
  keys(): string[] {
    return Array.from(this._values.keys());
  }

  /**
   * Get all values in the test context
   */
  values(): any[] {
    return Array.from(this._values.values());
  }

  /**
   * Get all entries in the test context
   */
  entries(): [string, any][] {
    return Array.from(this._values.entries());
  }
}

// Create a singleton instance
const testContext = new Context();
export default testContext;
