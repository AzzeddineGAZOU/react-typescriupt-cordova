import Service from './Service';

const baseUrl = 'http://5.196.4.56:3000/ingredient';

const IngredientService = new Service(baseUrl);

export default IngredientService;