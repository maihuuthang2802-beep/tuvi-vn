'use client';

import { useEffect, useState } from 'react';
import { ReadingResult } from '@/lib/readings';

export function useAIInterpretation(service: string, reading: ReadingResult, question?: string) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInterpretation = async () => {
      setLoading(true);
      setError('');
      setText('');

      try {
        const res = await fetch('/api/ai/interpret', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ service, reading, question }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'AI request failed');
        }

        const data = await res.json();
        setText(data.interpretation);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchInterpretation();
  }, [service, reading, question]);

  return { text, loading, error };
}
