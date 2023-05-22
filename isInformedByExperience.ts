/**
 * How to determine isInformedByExperience?
 *
 * Outline:
 * - Necessary to know whether we can allow the person to implement the function by himself or to require that he finds it (e.g. gets advice of others, or reads articles on the internet)
 * - The problem exists because every object has multiple models
 *   - Examples
 *     - A protein is both "Protein" and "NutritionalSupplement" and "Product"
 *       - Person might have experience with filtering Products (e.g. by reviews) or estimating Products (e.g. by price), but he might not have experience with filtering "Protein" / "NutritionalSupplement"
 *
 * Options:
 * - Determine by the most specific model (by the model that the person specified when he started the choice)
 * - Require the person to use a compositional model + compositional filters + compositional estimators
 */
export const temp = {}
