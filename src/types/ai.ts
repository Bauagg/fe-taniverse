export interface DetectionType {
  name: string;
  description: string;
}

export interface DetectionResult {
  name: string;
  scientificName: string;
  confidence: number;
  description: string;
  types: DetectionType[];
  symptoms: string[];
}
