export interface IPropertyRequest {
  value: number;
  size: number;
  address: IAddressRequest;
  categoryId: string;
}
export interface IPropertyResponse extends IPropertyRequest {
  category: string;
}
export interface IAddressRequest {
  id?: string;
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}
