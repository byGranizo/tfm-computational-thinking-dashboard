//Número de turnos en completar las misiones según su bioma

import { useState, useCallback, useEffect } from 'react'

export const useTurnsToCompleteMissionByBiomeStat = () => { 
  const [data, setData] = useState([])

  const calculateTurnsToCompleteMissionByBiomeStat = useCallback((missions) => {
    const biomes = {}

    missions.forEach(mission => {
      const biome = mission.biome
      const turns = mission.turns

      if(biomes[biome]){
        biomes[biome].totalTurns += turns
        biomes[biome].totalMissions++
        return
      } else {
        biomes[biome] = {
          totalTurns: turns,
          totalMissions: 1
        }
      }
    })

    const turnsToCompleteMissionByBiome = Object.keys(biomes).map(biomeKey => {
  const biome = biomes[biomeKey];
  const averageTurns = biome.totalTurns / biome.totalMissions;

  return {
    biome: biomeKey,
    averageTurns
  };
});

    setData(turnsToCompleteMissionByBiome)
  }, [])

  useEffect(() => {
    calculateTurnsToCompleteMissionByBiomeStat(missions)
  }, [])

  return data
}