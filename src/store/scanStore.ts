import { create } from 'zustand';
import { ScanResult } from '../types';

interface ScanState {
  scans: ScanResult[];
  addScan: (scan: ScanResult) => void;
  getScanHistory: () => ScanResult[];
  deleteScan: (id: string) => void;
  clearHistory: () => void;
  getStats: () => {
    total: number;
    safe: number;
    suspicious: number;
    highRisk: number;
  };
}

export const useScanStore = create<ScanState>((set, get) => ({
  scans: JSON.parse(localStorage.getItem('scans') || '[]'),
  
  addScan: (scan: ScanResult) => {
    set((state) => {
      const updated = [scan, ...state.scans];
      localStorage.setItem('scans', JSON.stringify(updated));
      return { scans: updated };
    });
  },
  
  getScanHistory: () => get().scans,
  
  deleteScan: (id: string) => {
    set((state) => {
      const updated = state.scans.filter((s) => s.id !== id);
      localStorage.setItem('scans', JSON.stringify(updated));
      return { scans: updated };
    });
  },
  
  clearHistory: () => {
    set({ scans: [] });
    localStorage.removeItem('scans');
  },
  
  getStats: () => {
    const scans = get().scans;
    return {
      total: scans.length,
      safe: scans.filter((s) => s.riskLevel === 'low').length,
      suspicious: scans.filter((s) => s.riskLevel === 'medium').length,
      highRisk: scans.filter((s) => s.riskLevel === 'high').length,
    };
  },
}));
