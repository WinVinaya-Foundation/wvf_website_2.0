import { useCallback, useEffect, useState } from 'react';
import type { RazorpayCheckoutOptions } from '../model/razorpay';

const CHECKOUT_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_SCRIPT_SRC}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay Checkout')));
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = CHECKOUT_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay Checkout'));
    document.body.appendChild(script);
  });
}

/** Lazily loads Razorpay's Checkout script (only needed on the donate page, so it isn't
 * injected globally in index.html) and exposes a typed `open()` to launch the payment modal. */
export function useRazorpayCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(() => Boolean(window.Razorpay));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isReady) return;
    setIsLoading(true);
    loadRazorpayScript()
      .then(() => setIsReady(true))
      .catch(() => setError('Could not load the payment provider. Please refresh and try again.'))
      .finally(() => setIsLoading(false));
  }, [isReady]);

  const open = useCallback((options: RazorpayCheckoutOptions) => {
    if (!window.Razorpay) {
      setError('Payment provider is not ready yet. Please try again in a moment.');
      return;
    }
    new window.Razorpay(options).open();
  }, []);

  return { isReady, isLoading, error, open };
}
