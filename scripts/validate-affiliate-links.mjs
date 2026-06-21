import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const args = new Set(process.argv.slice(2));
const strict = args.has('--strict');
const products = JSON.parse(readFileSync(join('src', 'data', 'products.json'), 'utf8'));
const programs = JSON.parse(readFileSync(join('src', 'data', 'affiliatePrograms.json'), 'utf8'));
const programIds = new Set(programs.map((program) => program.id));
const warnings = [];

for (const product of products) {
  if (product.isAffiliate && !product.disclosureRequired) {
    warnings.push(`${product.id}: isAffiliate is true but disclosureRequired is not true.`);
  }

  if (product.isAffiliate && !product.affiliateUrl) {
    warnings.push(`${product.id}: affiliateUrl is empty. Add it after ASP approval or keep as a known placeholder.`);
  }

  if (!product.officialUrl && !product.affiliateUrl) {
    warnings.push(`${product.id}: both officialUrl and affiliateUrl are empty.`);
  }

  if (!product.experienceStatus) {
    warnings.push(`${product.id}: experienceStatus is missing.`);
  }

  if (!product.primaryCategoryId) {
    warnings.push(`${product.id}: primaryCategoryId is missing.`);
  }

  if (!product.recommendedFor) {
    warnings.push(`${product.id}: recommendedFor is missing.`);
  }

  if (!product.caution) {
    warnings.push(`${product.id}: caution is missing.`);
  }

  if (typeof product.priority !== 'number') {
    warnings.push(`${product.id}: priority must be a number.`);
  }

  if (product.programId && !programIds.has(product.programId)) {
    warnings.push(`${product.id}: programId "${product.programId}" does not exist in affiliatePrograms.json.`);
  }
}

for (const program of programs) {
  if (!program.requiredDisclosure) {
    warnings.push(`${program.id}: requiredDisclosure is missing.`);
  }

  if (!program.disclosureLabel) {
    warnings.push(`${program.id}: disclosureLabel is missing.`);
  }
}

if (warnings.length === 0) {
  console.log('Affiliate link validation passed.');
  process.exit(0);
}

console.log('Affiliate link validation warnings:');
for (const warning of warnings) {
  console.log(`- ${warning}`);
}

if (strict) {
  process.exit(1);
}
