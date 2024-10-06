import mongoose, { Schema, Document } from 'mongoose';

interface ICity {
  name: string;
  photo: string;
  priceInCents: number;
}

interface ILocation extends Document {
  continent: string;
  country: string;
  countryCarouselPhotos: string[];
  cities: ICity[];
  sections: {
    mission: {
      title: string;
      content: string;
      photo: string;
    };
    overview: {
      title: string;
      content: string;
      photo: string;
    };
    group: {
      title: string;
      content: string;
      photo: string;
    };
    explore: {
      title: string;
      content: string;
      photo: string;
    };
  };
}

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  priceInCents: { type: Number, required: true }
});

const LocationSchema: Schema = new Schema({
  continent: { type: String, required: true },
  country: { type: String, required: true },
  countryCarouselPhotos: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 2']
  },
  cities: { type: [CitySchema], required: true },
  sections: {
    mission: {
      title: { type: String, default: 'Our Mission' },
      content: { type: String, required: true },
      photo: { type: String, required: true }
    },
    overview: {
      title: { type: String, default: 'Location Overview' },
      content: { type: String, required: true },
      photo: { type: String, required: true }
    },
    group: {
      title: { type: String, default: 'Group Activities' },
      content: { type: String, required: true },
      photo: { type: String, required: true }
    },
    explore: {
      title: { type: String, default: 'Explore Our Location' },
      content: { type: String, required: true },
      photo: { type: String, required: true }
    }
  }
});

function arrayLimit(val: any[]) {
  return val.length <= 2;
}

export default mongoose.model<ILocation>('Location', LocationSchema);