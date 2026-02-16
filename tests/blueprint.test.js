/**
 * Blueprint Schema Validation Tests
 * 
 * Validates that .blueprint.json conforms to the WordPress Playground schema.
 * Uses ajv (JSON Schema validator) for strict validation.
 * 
 * Run: npm test -- --testPathPattern=blueprint
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const SCHEMA_URL = 'https://playground.wordpress.net/blueprint-schema.json';

describe('Blueprint Schema Validation', () => {
    let ajv;
    let schema;
    let blueprintData;

    beforeAll(async () => {
        ajv = new Ajv({ allErrors: true, verbose: true });
        
        // Fetch the official schema
        const response = await fetch(SCHEMA_URL);
        schema = await response.json();
        
        // Load the Blueprint file
        const blueprintPath = path.join(__dirname, '..', '.blueprint.json');
        const fileContent = fs.readFileSync(blueprintPath, 'utf8');
        blueprintData = JSON.parse(fileContent);
    });

    it('should have valid JSON syntax', () => {
        expect(blueprintData).toBeDefined();
        expect(typeof blueprintData).toBe('object');
    });

    it('should conform to WordPress Playground Blueprint schema', () => {
        const validate = ajv.compile(schema);
        const valid = validate(blueprintData);
        
        if (!valid) {
            console.error('Schema validation errors:', validate.errors);
        }
        
        expect(valid).toBe(true);
    });

    it('should have required meta fields', () => {
        expect(blueprintData.meta).toBeDefined();
        expect(blueprintData.meta.title).toBeDefined();
    });

    it('should specify valid PHP and WordPress versions', () => {
        const { preferredVersions } = blueprintData;
        if (preferredVersions) {
            expect(preferredVersions.php).toBeDefined();
            expect(preferredVersions.wp).toBeDefined();
        }
    });

    it('should have at least one step defined', () => {
        expect(blueprintData.steps).toBeDefined();
        expect(blueprintData.steps.length).toBeGreaterThan(0);
    });
});
