# PROGRAMMABLE-TRAINS

In this game you are a train engineer building programmable trains: python classes that interact with the train game environment:
- train stations are going to call `train_depart(from_station, to_station)`
- shops are going to call `train_unload(element, quantity)/train_load(element, quantity): money` with market mechanics (bid/offer)
- fuel stations are going to call `train_recharge(money): fuel`

The game environment is a 2D sandbox/open world where the player build railways and trains, with a live code editor to build trains.

## You will like this game if you like
Factorio, minecraft, dwarf-fortress.


# Tech Stack

## Game engine

Probably using
Using https://github.com/photonstorm/phaser

### UI
- How does the train move

### Game State
- Moneys, fuel, entities

## Coding editor

How do you add a live code editor that modify the code.
Does the player modify the game source code? No, they are temp python/javascript files that are saved and read at runtime as the game runs.

