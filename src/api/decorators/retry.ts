export function retry(maxAttempts: number = 3, delay: number = 1000) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let attempts = 0;
      let lastError;

      while (attempts < maxAttempts) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          attempts++;
          if (attempts === maxAttempts) break;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      throw lastError;
    };

    return descriptor;
  };
} 