const {Neat, Network, architect, methods} = carrot

 const neat = new Neat(6,2,
  {
    population_size: GAMES,
    elitism: elitism,
    mutation_rate: mutation_rate,
    mutation_amount: mutation_amount,
    // fitness:null,
    equal: false
  }
 )
 
console.log(neat);

const chartData = {
  labels: [],
  datasets: [
    {
      name: 'Max',
      values: []
    },
    {
      name: 'Average',
      values: []
    },
    {
      name: 'Min',
      values: []
    }
  ]
}

const chart = new Chart('#chart', {
  title: 'Generation score history',
  type: 'line',
  height: 180,
  data: chartData
})

let highestScore = 0

const runner = new Runner({
  neat,
  games: GAMES,
  gameSize: GAME_SIZE,
  gameUnit:  GAME_UNIT,
  frameRate: FRAME_RATE,
  maxTurns: MAX_TURNS,
  lowestScoreAllowed: LOWEST_SCORE_ALLOWED,
  score: {
    movedTowardsFood: POINTS_MOVED_TOWARDS_FOOD,
    movedAgainstFood: POINTS_MOVED_AGAINST_FOOD,
    ateFood: POINTS_ATE_FOOD
  },
  onEndGeneration: ({generation, max, avg, min}) => {
    chartData.labels.push(generation.toString())
    chartData.datasets[0].values.push(max)
    chartData.datasets[1].values.push(avg)
    chartData.datasets[2].values.push(min)

    if (chartData.labels.length > 15) {
      chartData.labels.shift()
      chartData.datasets.forEach(d => d.values.shift())
    }

    chart.update(chartData)
    if (max > highestScore) {
      highestScore = max
    }

    document.getElementById('generation').innerHTML = generation
    document.getElementById('highest-score').innerHTML = highestScore
  }
})

runner.startGeneration()
