declare module "vcf" {
  interface Record {
    ID: string;
    INFO?: { [key: string]: any };
    genotype?: string;
  }

  class VCF {
    records: Record[];
    parse(vcfText: string): void;
  }

  export default VCF;
}
