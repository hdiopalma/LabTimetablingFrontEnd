import { defineStore } from 'pinia';
import { AppConfig } from '@/services/appConfig';
const algoPath = 'algorithm/generate_timetabling/';

export const useSolutionConfigurationStore = defineStore('solutionConfiguration', {
    state: () => ({
        configuration : {
            semester: null,
            algorithm: {
                algorithm: 'genetic_local_search', // Will be set dynamically
                config: {
                    max_iteration: 500,
                    population_size: 40,
                    elitism_size: 2,
                    max_stagnation: 50,
                    // hybrid parameters
                    local_search_frequency: 15,
                    num_local_search_candidates: 5,
                    adaptive_local_search: false,
                    fitness:{
                        group_assignment_conflict: {
                            max_threshold: 3,
                            conflict_penalty: 0.5,
                        },
                        assistant_distribution: {
                            max_group_threshold: 9,
                            max_shift_threshold: 5,
                            group_penalty: 0.4,
                            shift_penalty: 0.6,
                        },
                        timeslot_conflict: {
                            assistant_conflict_penalty: 1.2,
                            group_conflict_penalty: 0.8,
                        },
                    },
                    operator:{
                        selection:{
                            roulette_wheel: false,
                            tournament: true,
                            elitism: true,
                            tournament_size: 5,
                        },
                        crossover:{
                            single_point: false,
                            two_point: true,
                            uniform: false,
                            crossover_probability: 0.8,
                            uniform_probability: 0.2,
                        },
                        mutation:{
                            swap: true,
                            shift: true,
                            repair: false,
                            mutation_probability: 0.15,
                        },
                        repair:{
                            time_slot: true,
                        }
                    }
                },
            },
            local_search: {
                algorithm: 'tabu_search', // Will be set dynamically
                config: {
                    neighborhood:{
                        algorithm: 'random_swap',
                        random_swap:{
                            neighborhood_size: 20,
                        },
                        random_range_swap:{
                            neighborhood_size_factor: 0.1,
                            range_size_factor: 0.1,
                        },
                        distance_swap: {
                            distance_percentage: 0.1,
                        },
                        swap: false,
                    },
                    simulated_annealing:{
                        initial_temperature: 1000,
                        cooling_rate: 0.9,
                        max_iteration: 150,
                    },
                    tabu_search:{
                        tabu_size: 40,
                        max_iteration: 150,
                        max_stagnation: 75,
                    },
                },
            },
        }
    }),
    getters: {
        getConfiguration() {
            return this.configuration;
        },
        getSemester() {
            return this.configuration.semester;
        },
        getAlgorithm() {
            return this.configuration.algorithm;
        },
        getLocalSearch() {
            return this.configuration.local_search;
        },
        

        //More specific getters.
        getFitness() {
            return this.configuration.algorithm.config.fitness;
        },
        getOperator() {
            return this.configuration.algorithm.config.operator;
        },
        getSelection() {
            return this.configuration.algorithm.config.operator.selection;
        },
        getCrossover() {
            return this.configuration.algorithm.config.operator.crossover;
        },
        getMutation() {
            return this.configuration.algorithm.config.operator.mutation;
        },
        getRepair() {
            return this.configuration.algorithm.config.operator.repair;
        },
        getNeighborhood() {
            return this.configuration.local_search.config.neighborhood;
        },
        getRandomSwap() {
            return this.configuration.local_search.config.neighborhood.random_swap;
        },
        getRandomRangeSwap() {
            return this.configuration.local_search.config.neighborhood.random_range_swap;
        },
        getDistanceSwap() {
            return this.configuration.local_search.config.neighborhood.distance_swap;
        },

        getLocalSearchAlgorithm() {
            return this.configuration.local_search.algorithm;
        },
        getSimulatedAnnealing() {
            return this.configuration.local_search.config.simulated_annealing;
        },
        getTabuSearch() {
            return this.configuration.local_search.config.tabu_search;
        },
    },
    actions: {
        //Setters.
        setConfiguration(configuration) {
            this.configuration = configuration;
        },
        setSemester(semester) {
            this.configuration.semester = semester;
        },
        setAlgorithm(algorithm) {
            this.configuration.algorithm= algorithm;
        },
        setLocalSearch(local_search) {
            this.configuration.local_search = local_search;
        },

        //More specific setters.
        setAlgorithmConfig(data) {
            this.configuration.algorithm.algorithm = data.algorithm;
            this.configuration.algorithm.config.max_iteration = data.config.max_iteration;
            this.configuration.algorithm.config.population_size = data.config.population_size;
            this.configuration.algorithm.config.elitism_size = data.config.elitism_size;
        },
        setLocalSearchAlgorithm(data) {
            this.configuration.local_search.algorithm = data;
        },

        setFitness(fitness) {
            this.configuration.algorithm.config.fitness = fitness;
        },
        setOperator(operator) {
            this.configuration.algorithm.config.operator = operator;
        },
        setSelection(selection) {
            this.configuration.algorithm.config.operator.selection = selection;
        },
        setCrossover(crossover) {
            this.configuration.algorithm.config.operator.crossover = crossover;
        },
        setMutation(mutation) {
            this.configuration.algorithm.config.operator.mutation = mutation;
        },
        setRepair(repair) {
            this.configuration.algorithm.config.operator.repair = repair;
        },
        setNeighborhood(neighborhood) {
            this.configuration.local_search.config.neighborhood = neighborhood;
        },
        setRandomSwap(random_swap) {
            this.configuration.local_search.config.neighborhood.random_swap = random_swap;
        },
        setRandomRangeSwap(random_range_swap) {
            this.configuration.local_search.config.neighborhood.random_range_swap = random_range_swap;
        },
        setDistanceSwap(distance_swap) {
            this.configuration.local_search.config.neighborhood.distance_swap = distance_swap;
        },
        setSimulatedAnnealing(simulated_annealing) {
            this.configuration.local_search.config.simulated_annealing = simulated_annealing;
        },
        setTabuSearch(tabu_search) {
            this.configuration.local_search.config.tabu_search = tabu_search;
        },

        async applyConfiguration() {
            try {
                //console.log('Configuration:', JSON.stringify(this.configuration));
                const response = await this.$apiURL.post(algoPath, this.configuration);
                // console.log('Configuration applied:', response);
                return response;
            } catch (error) {
                console.error('Error applying configuration:', error);
                return error.response;
            }
        }
    },
});