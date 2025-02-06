import { useState, useEffect } from "react";

export default function useGet<T>(url: string): {
    data: T,
    error: string | null,
    loading: boolean,
    fetchData: () => void
} {

    const [data, setData] = useState<T>([] as T);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
      }, [url]);
    
      const fetchData = async () => {
        try {
          setLoading(true);
    
          const response = await fetch(url);
    
          if (!response.ok) {
            throw new Error(`Det blev ett fel: ${response.status}`);
          }
    
          const data = await response.json();
          setData(data);
    
    
        } catch (error) {
          setError(`Det blev ett fel vid inhämntning av todos: ${error}`);
        } finally {
          setLoading(false);
        }
      }

    return { data, error, loading, fetchData }
}