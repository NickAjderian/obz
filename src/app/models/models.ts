  export interface Ward {
    ward_id: string;
    ward_name: string;
    is_open: boolean;
    owner: string;
  }
  export interface Patient {
    patient_id: string;
    patient_number: string; // eg nhs number, optional
    patient_name: string;
    level: number; // observation level
    observe_every: number; // observations required every ... min
    last_observation: Date;
    last_observation_result: string;
    is_on_ward: boolean;
  }
  export interface ObservationLevel {
    id: number;
    level: number;
    name: string;
    observe_every: number;
  }

  export interface Observation {
    time: Date;
    result: string;
    observer: string;
    patient_id: string;
    ward_id: string;
  }
