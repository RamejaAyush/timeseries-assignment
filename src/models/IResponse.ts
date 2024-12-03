export interface IHealthResponse {
  status: boolean;
  message: string;
  uptime: number;
}

export interface INotFoundResponse {
  status: boolean;
  message: string;
}

export interface TimeSeriesEntry {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface TimeSeriesData {
  symbol: string;
  period: string;
  data: TimeSeriesEntry[];
}

export interface ITimeseriesSuccessResponse {
  status: boolean;
  data: any;
}

export interface ITimeseriesErrorResponse {
  status: boolean;
  message: string;
}
