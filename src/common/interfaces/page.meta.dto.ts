import {
  CADPageOptionsDto,
  PageOptionsDto,
  PageOptionsWithoutWalletNoDto,
} from '../dto/pageoptions.dto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto | PageOptionsWithoutWalletNoDto;
  itemCount: number;
}
