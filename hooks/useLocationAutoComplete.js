import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const API_URL = 'https://api.locationiq.com/v1/autocomplete';
const API_KEY = process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY;

const useLocationAutoComplete = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL, {
          params: {
            key: API_KEY,
            q: query,
            countrycodes: 'dk', // Limit results to Denmark
          },
        });
        setSuggestions(response.data);
      } catch (err) {
        setError('Unable to fetch location suggestions');
      } finally {
        setLoading(false);
      }
    }, 300), // Délai de 300 ms
    []
  );

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    fetchSuggestions(query);

    // Clean up the debounce function on unmount
    return () => {
      fetchSuggestions.cancel();
    };
  }, [query, fetchSuggestions]);

  return { suggestions, loading, error };
};

export default useLocationAutoComplete;
