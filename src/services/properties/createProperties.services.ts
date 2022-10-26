import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appErrors";
import { IPropertyRequest } from "../../interfaces/properties";
import { Properties } from "../../entities/properties.entity";
import { Address } from "../../entities/address.entity";
import { Categories } from "../../entities/categories.entity";

export const createPropertiesService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const propertiesRep = AppDataSource.getRepository(Properties);

  const adressRepositori = AppDataSource.getRepository(Address);

  const catRepositori = AppDataSource.getRepository(Categories);

  const getCategory = await catRepositori.findOneBy({
    id: categoryId,
  });

  if (!getCategory) {
    throw new AppError("category not found", 404);
  }

  const findAdress = await adressRepositori.findOneBy({
    number: address.number,
    district: address.district,
  });

  if (findAdress) {
    throw new AppError("Adress already exists", 400);
  }
  if (address.state.length > 2) {
    throw new AppError("State have max 2 characters", 400);
  }
  if (address.zipCode.length > 8) {
    throw new AppError("zipCode have max 8 characters", 400);
  }
  const createdAddress = adressRepositori.create({
    id: address.id,
    district: address.district,
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state,
  });

  await adressRepositori.save(createdAddress);

  const createdPropertie = propertiesRep.create({
    value,
    size,
    address: createdAddress,
    category: getCategory,
  });

  await propertiesRep.save(createdPropertie);

  return createdPropertie;
};
