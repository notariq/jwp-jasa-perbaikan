export interface UserType {
  _id?: string;
  email: string;
  name?: string;
  password?: string;
}

export interface ServiceType {
  _id: string;
  service_name: string;
  rate_per_hour: number;
  description: string;
  image_src?: string;
}

export interface OrderType {
  _id: string;
  service_id: string;
  date: string;
  hours: number;
  phone: string;
  address: string;
  note: string;
  estimation: string;
  status?: string;
  service_name?: string;
};