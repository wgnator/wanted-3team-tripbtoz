export interface UserDataType {
  hotelName: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
}
export interface searchQueryType {
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: string;
}

export type UserData = UserDataType[];

export interface Hotel {
  hotel_name: string;
  occupancy: {
    base: number;
    max: number;
  };
}

export type Hotels = Hotel[];
