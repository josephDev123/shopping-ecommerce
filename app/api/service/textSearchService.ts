import { TextSearchRepo } from "../repository/TextSearchRepo";

export class TextSearchService {
  constructor(private readonly TextSearchRepo: TextSearchRepo) {}
  async searchImpl(text: string, page: number, limit: number) {
    try {
      const response = await this.TextSearchRepo.search(text, page, limit);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
