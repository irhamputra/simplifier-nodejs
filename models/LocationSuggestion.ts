export default interface RootObject {
  timestamp: string;
  message: string;
  success: boolean;
  additional_data: Additionaldata;
  data: Data;
  error?: any;
}

interface Data {
  suggestLocationType: string;
  suggestLokation: string[];
  calculationResult?: any;
  unique: boolean;
}

interface Additionaldata {}
