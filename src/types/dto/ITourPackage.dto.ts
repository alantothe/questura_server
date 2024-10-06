export type ITourPackage = {
    _id: string;
    title: string;
    country: string;
    city: string;
    images: string[];
    priceInCents: number;
    about: string;
    whatToExpect: string[];
    duration: string;
    startTime: string;
    highlights: string[];
    additionalInformation: string[];
    provider: string;
    startLocation: string;
    address: string;
    endLocation: string;
  }