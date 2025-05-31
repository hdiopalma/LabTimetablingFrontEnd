import { defineStore } from 'pinia';
import { AppConfig } from '@/services/appConfig';
const algoPath = 'algorithm/generate_timetabling/';

export const useSolutionConfigurationStore = defineStore('solutionConfiguration', {
    state: () => ({
        configuration : {
            semester: null,
            algorithm: {
                algorithm: 'genetic_local_search',
                config: {
                    max_iteration: 500,
                    population_size: 25,
                    elitism_size: 2,
                    max_stagnation: 100,
                    // hybrid parameters
                    local_search_frequency: 10,
                    num_local_search_candidates: 1,
                    adaptive_local_search: false,
                    fitness:{
                        group_assignment_conflict: {
                            max_threshold: 3,
                            conflict_penalty: 0.5,
                        },
                        assistant_distribution: {
                            max_group_threshold: 15,
                            max_shift_threshold: 15,
                            group_penalty: 0.25,
                            shift_penalty: 0.75,
                        },
                        timeslot_conflict: {
                            assistant_conflict_penalty: 1,
                            group_conflict_penalty: 0.5,
                        },
                    },
                    operator:{
                        selection:{
                            roulette_wheel:true,
                            tournament:false,
                            elitism:true,
                            tournament_size: 5,
                        },
                        crossover:{
                            single_point:true,
                            two_point:false,
                            uniform:false,
                            crossover_probability: 0.1,
                            uniform_probability: 0.5,
                        },
                        mutation:{
                            swap:true,
                            shift:false,
                            repair:false,
                            mutation_probability: 0.1,
                        },
                        repair:{
                            time_slot:true,
                        }
                    }
                },
            },
            local_search: {
                algorithm: 'simulated_annealing',
                config: {
                    neighborhood:{
                        algorithm: 'random_swap',
                        random_swap:{
                            neighborhood_size: 10,
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
                        initial_temperature: 500,
                        cooling_rate: 0.1,
                        max_iteration: 250,
                    },
                    tabu_search:{
                        tabu_size: 50,
                        max_iteration: 250,
                        max_stagnation: 100,
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