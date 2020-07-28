import SuggestLocationModel from '../sampleData/suggestLocation';

interface ResponseModel {
  timestamp: string;
  message: string;
  success: boolean;
  additional_data: Additionaldata;
  data: Data;
  error?: any;
}

interface Data {
  suggestLocationType?: any;
  suggestLokation?: any;
  calculationResult: CalculationResult;
  unique: boolean;
}

interface CalculationResult {
  sonstigeAngaben?: any;
  fehlermeldung?: any;
  warnung?: any;
  antwortStatus: number;
  itag: string;
  ergebnisseGesamtAnzahl: number;
  ergebnisContainer: ErgebnisContainer[];
}

interface ErgebnisContainer {
  versorgerInformation: VersorgerInformation[];
  dynamischeAngaben?: any;
  plz: string;
  ort?: string;
  ergebnisseAnzahl: number;
  ergebnisseSeiteAnzahl: number;
  uid?: any;
  ergebnis: Ergebni[];
}

interface Ergebni {
  informationen?: Informationen[];
  boni?: any;
  aufschlaege?: Aufschlaege[];
  strommixLight: StrommixLight;
  netzEntgeltBerechnung?: any;
  margeBerechnung?: any;
  kennzahlErgebnis?: any;
  dynamischeAngaben?: any;
  gesamtpreisNetto: number;
  gesamtpreisOhneBoniNetto: number;
  gesamtpreisBrutto: number;
  gesamtpreisOhneBoniBrutto: number;
  versorgerName: string;
  tarifName: string;
  ersparnisNetto: number;
  ersparnisBrutto: number;
  tarifID: number;
  tarifRootID: number;
  variantenID?: string;
  tarifInfo?: string;
  versorgerID: number;
  gueltigVon: GueltigVon;
  gueltigBis?: any;
  arbeitspreisNetto: number;
  grundpreisNetto: number;
  arbeitspreisBrutto: number;
  grundpreisBrutto: number;
  isOekostromTarif: boolean;
  isVorkasseTarif: boolean;
  arbeitspreisHTCtKWhNetto: number;
  arbeitspreisNTCtKWhNetto?: any;
  arbeitspreisHTCtKWhBrutto: number;
  arbeitspreisNTCtKWhBrutto?: any;
  paketMehrverbrauchsPreisNetto?: any;
  paketPreisNetto?: any;
  paketMehrverbrauchsPreisBrutto?: any;
  paketPreisBrutto?: any;
  isPaketTarif: boolean;
  vertragslaufzeit: string;
  vertragsverlaengerungID: number;
  vertragsverlaengerung: string;
  kuendigungsfristID: number;
  kuendigungsfrist: string;
  markenID: number;
  isGrundversorgungsTarif: boolean;
  isVergleichsTarif: boolean;
  paketMenge?: any;
  anzeigeVon?: any;
  anzeigeBis?: any;
  vertragslaufzeitID: number;
  tarifCode?: string;
  arbeitspreisEnergiepreisHTNetto?: any;
  arbeitspreisEnergiepreisNTNetto?: any;
  grundpreisEnergiepreisNetto?: any;
  arbeitspreisEnergiepreisHTBrutto?: any;
  arbeitspreisEnergiepreisNTBrutto?: any;
  grundpreisEnergiepreisBrutto?: any;
  arbeitspreisEnergiepreisHTCtKWhNetto?: any;
  arbeitspreisEnergiepreisNTCtKWhNetto?: any;
  arbeitspreisEnergiepreisHTCtKWhBrutto?: any;
  arbeitspreisEnergiepreisNTCtKWhBrutto?: any;
}

interface StrommixLight {
  dynamischeAngaben?: any;
  co2: number;
  erneuerbare: number;
  fossile: number;
  kernkraft: number;
  radioaktiv: number;
  stand: number;
}

interface Aufschlaege {
  zertifikate: Zertifikate[];
  sonstigeAngaben?: any;
  gueltigVon?: any;
  gueltigBis?: any;
  bedingungID: number;
  bedingung: string;
  einheitID: number;
  einheit: string;
  vertragslaufzeitID: number;
  vertragslaufzeit: string;
  oekostromAnteil: number;
  wertNetto: number;
  wertBrutto: number;
  verbrauchVon: number;
  verbrauchBis: number;
  preisgarantieBestandteileID?: any;
  preisgarantieBestandteile?: any;
  preisgarantieBis?: any;
  preisgarantieFuerMonate?: any;
  id: number;
  beschreibungstext?: any;
  art: string;
  artID: number;
  maxWertNetto: number;
  maxWertBrutto: number;
  maxWertEinheitID: number;
  calcWertNetto: number;
  calcWertBrutto: number;
}

interface Informationen {
  zertifikate?: (Zertifikate[] | null)[];
  sonstigeAngaben?: any;
  gueltigVon?: GueltigVon | GueltigVon | null;
  gueltigBis?: any;
  bedingungID: number;
  bedingung: string;
  einheitID: number;
  einheit?: any;
  vertragslaufzeitID: number;
  vertragslaufzeit: string;
  oekostromAnteil: number;
  wertNetto: number;
  wertBrutto: number;
  verbrauchVon: number;
  verbrauchBis: number;
  preisgarantieBestandteileID?: (null | number)[];
  preisgarantieBestandteile?: (null | string)[];
  preisgarantieBis?: (GueltigVon | null)[];
  preisgarantieFuerMonate?: (null | number)[];
  id: number;
  beschreibungstext?: (null | string)[];
  art: string;
  artID: number;
  maxWertNetto: number;
  maxWertBrutto: number;
  maxWertEinheitID: number;
  calcWertNetto?: any;
  calcWertBrutto?: any;
}

interface GueltigVon {
  year: number;
  month: string;
  dayOfWeek: string;
  era: string;
  dayOfYear: number;
  leapYear: boolean;
  chronology: Chronology;
  monthValue: number;
  dayOfMonth: number;
}

interface Chronology {
  calendarType: string;
  id: string;
}

interface Zertifikate {
  sonstigeAngaben?: any;
  zertifikat: string;
  zertifikatID: number;
}

interface VersorgerInformation {
  marktrollen: Marktrollen[];
  sonstigeAngaben?: any;
  gebiet?: string;
  versorgerID: number;
  versorgerName: string;
}

interface Marktrollen {
  sonstigeAngaben?: any;
  marktrolleID: number;
  verbandsnummer: string;
  verbandsnummerKurz: string;
}

interface Additionaldata {}

export type Response = ResponseModel | typeof SuggestLocationModel;
