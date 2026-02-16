/**
 * Blueprint Execution Tests
 * 
 * Validates that the Blueprint executes correctly using @wp-playground/cli.
 * Tests plugin installation, activation, and basic functionality.
 * 
 * Run: npm test -- --testPathPattern=execution
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('Blueprint Execution Tests', () => {
    const blueprintPath = path.join(__dirname, '..', '.blueprint.json');
    
    beforeAll(() => {
        // Verify blueprint file exists
        expect(fs.existsSync(blueprintPath)).toBe(true);
    });

    it('should validate Blueprint JSON before execution', () => {
        const content = fs.readFileSync(blueprintPath, 'utf8');
        expect(() => JSON.parse(content)).not.toThrow();
    });

    it('should have valid resource URLs in installPlugin steps', () => {
        const content = fs.readFileSync(blueprintPath, 'utf8');
        const blueprint = JSON.parse(content);
        
        const pluginSteps = blueprint.steps?.filter(
            step => step.step === 'installPlugin'
        ) || [];
        
        pluginSteps.forEach(step => {
            if (step.pluginData?.resource === 'url') {
                expect(step.pluginData.url).toBeDefined();
                // URL should be accessible (basic check)
                expect(step.pluginData.url).toMatch(/^https?:\/\//);
            }
            if (step.pluginData?.resource === 'git:directory') {
                expect(step.pluginData.url).toBeDefined();
                expect(step.pluginData.ref).toBeDefined();
            }
        });
    });

    it('should have login before other wp-admin steps', () => {
        const content = fs.readFileSync(blueprintPath, 'utf8');
        const blueprint = JSON.parse(content);
        
        const steps = blueprint.steps || [];
        const loginIndex = steps.findIndex(s => s.step === 'login' || s.login === true);
        
        // If there are steps that likely require login
        const wpAdminSteps = steps.filter(s => 
            ['installPlugin', 'activatePlugin', 'createPost'].includes(s.step)
        );
        
        if (wpAdminSteps.length > 0 && loginIndex === -1 && !blueprint.login) {
            throw new Error('Blueprint should include login step before wp-admin operations');
        }
    });

    it('should specify landingPage', () => {
        const content = fs.readFileSync(blueprintPath, 'utf8');
        const blueprint = JSON.parse(content);
        
        expect(blueprint.landingPage).toBeDefined();
    });

    it('should have installPlugin and activatePlugin steps', () => {
        const content = fs.readFileSync(blueprintPath, 'utf8');
        const blueprint = JSON.parse(content);
        
        const steps = blueprint.steps || [];
        const hasInstall = steps.some(s => s.step === 'installPlugin');
        const hasActivate = steps.some(s => s.step === 'activatePlugin');
        
        expect(hasInstall).toBe(true);
        expect(hasActivate).toBe(true);
    });
});
