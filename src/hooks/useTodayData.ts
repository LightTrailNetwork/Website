import { useState, useEffect } from 'react';
import { getTodayData, setTodayData } from '../data/db';
import type { TodayData } from '../data/types';

export function useTodayData() {
  const [todayData, setTodayDataState] = useState<TodayData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodayData();
  }, []);

  const loadTodayData = async () => {
    try {
      const data = await getTodayData();
      setTodayDataState(data);
    } catch (error) {
      console.error('Failed to load today data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodayData = async (updates: Partial<Pick<TodayData, 'morning' | 'afternoon' | 'night'>>) => {
    if (!todayData) return;

    const updatedData = { ...todayData, ...updates };
    
    try {
      await setTodayData(updatedData);
      setTodayDataState(updatedData);
    } catch (error) {
      console.error('Failed to update today data:', error);
    }
  };

  const toggleMorning = () => updateTodayData({ morning: !todayData?.morning });
  const toggleAfternoon = () => updateTodayData({ afternoon: !todayData?.afternoon });
  const toggleNight = () => updateTodayData({ night: !todayData?.night });

  return {
    todayData,
    loading,
    updateTodayData,
    toggleMorning,
    toggleAfternoon,
    toggleNight,
    reload: loadTodayData
  };
}