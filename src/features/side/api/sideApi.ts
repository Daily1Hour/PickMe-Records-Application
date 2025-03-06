import { client } from "@/shared/api";
import { Summary } from "@/entities/records/model";
import { dtoToSide } from "../service";

export const fetchSidebarData = async (): Promise<Summary[]> => {
    const response = await client.get("/sidebar");
    return dtoToSide(response.data);
};
