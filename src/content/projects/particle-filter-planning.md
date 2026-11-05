---
title: Planning feasible motion through traffic
description: Using particle filtering to combine driving decisions and trajectory planning, evaluated in simulation and with scaled experimental vehicles.
publicationId: Berntorp2018dec
youtubeVideoId: v2pYQVnHfHY
videoTitle: Particle filter-based planning demonstration using mini-cars — MERL
videoCaption: "MERL’s related experimental demonstration uses Hamster mini-cars: one follows particle-filter-generated plans while two others form traffic. Decoupled PID controllers track the planned path and velocity."
---

## Problem

An autonomous vehicle must decide what to do and how to move. Changing lanes, passing a slower vehicle, or waiting for space each implies a different trajectory. That trajectory must respect the vehicle's dynamics and the surrounding traffic. A geometric path alone does not describe whether the vehicle can execute the maneuver at the planned speed.

The planner needs to evaluate these choices together, within the time available for the next planning update.

## Approach

The method formulates motion planning as a nonlinear, non-Gaussian estimation problem. Particle filtering generates candidate decisions and trajectories, then assigns weights according to how well they satisfy driving requirements. These requirements include road boundaries, preferred speed, and separation from surrounding vehicles.

Sampling control inputs and propagating a vehicle model produces trajectories that account for the modeled dynamics. A receding-horizon implementation repeatedly updates the plan as the vehicle and traffic move. Decision making and collision avoidance are integrated into that process, rather than treated as independent steps with potentially inconsistent outputs.

## Results and validation

The paper evaluates simulated road scenarios involving overtaking, collision avoidance, and blocked lanes. Physical experiments use Ackermann-steered Hamster mini-cars on a two-lane circuit, with motion capture providing position measurements. One vehicle executes the plans while two others act as moving obstacles. Lower-level PID controllers track the planned path and velocity.

The results show feasible trajectory generation in the studied scenarios. Reported computation times and memory requirements indicate suitability for real-time implementation.
