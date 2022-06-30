import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type VesselMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Vessel {
  readonly id: string;
  readonly mmsi: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Vessel, VesselMetaData>);
  static copyOf(source: Vessel, mutator: (draft: MutableModel<Vessel, VesselMetaData>) => MutableModel<Vessel, VesselMetaData> | void): Vessel;
}