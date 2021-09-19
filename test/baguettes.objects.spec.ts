import { validate } from 'class-validator';

import { getBaguette, getCreateBaguetteDto, getUpdateBaguetteDto } from './stubs/baguette.stub';

describe('BaguettesObjects', () => {
  describe('BaguetteEntity', () => {
    it('Baguette toString should be defined', () => {
      const baguetteObject = getBaguette();

      const result = baguetteObject.toString();

      expect(result).toBeDefined();
    });

    it('Baguette toString should equal', () => {
      const baguetteObject = getBaguette();
      const returnValue =
        '\n{\n' +
        `  id: ${baguetteObject.id},\n  price: ${baguetteObject.price},\n  sizeCm: ${baguetteObject.sizeCm},\n  type: ${
          baguetteObject.type
        },\n  condition: ${baguetteObject.condition},\n  bakedAt: '${baguetteObject.bakedAt.toISO()}'\n` +
        '}\n';

      const result = baguetteObject.toString();

      expect(result).toBe(returnValue);
    });
  });

  describe('CreateBaguetteDto', () => {
    it('CreateBaguetteDto toString should be defined', () => {
      const baguetteObject = getCreateBaguetteDto();

      const result = baguetteObject.toString();

      expect(result).toBeDefined();
    });

    it('CreateBaguetteDto toString should equal', () => {
      const baguetteObject = getCreateBaguetteDto();
      const returnValue =
        '\n{\n' +
        `  price: ${baguetteObject.price},\n  sizeCm: ${baguetteObject.sizeCm},\n  type: ${baguetteObject.type},\n  condition: ${baguetteObject.condition}\n` +
        '}\n';

      const result = baguetteObject.toString();

      expect(result).toBe(returnValue);
    });

    it('CreateBaguetteDto Validation', async () => {
      const baguetteObject = getCreateBaguetteDto();

      return validate(baguetteObject).then((errors) => {
        const result = errors.length;

        expect(result).toBe(0);
      });
    });
  });

  describe('UpdateBaguetteDto', () => {
    it('UpdateBaguetteDto toString should be defined', () => {
      const baguetteObject = getUpdateBaguetteDto();

      const result = baguetteObject.toString();

      expect(result).toBeDefined();
    });

    it('UpdateBaguetteDto toString should equal', () => {
      const baguetteObject = getUpdateBaguetteDto();
      const returnValue =
        '\n{\n' +
        `  price: ${baguetteObject.price},\n  sizeCm: ${baguetteObject.sizeCm},\n  type: ${baguetteObject.type},\n  condition: ${baguetteObject.condition}\n` +
        '}\n';

      const result = baguetteObject.toString();

      expect(result).toBe(returnValue);
    });

    it('UpdateBaguetteDto Validation', async () => {
      const baguetteObject = getUpdateBaguetteDto();

      return validate(baguetteObject).then((errors) => {
        const result = errors.length;

        expect(result).toBe(0);
      });
    });
  });
});
