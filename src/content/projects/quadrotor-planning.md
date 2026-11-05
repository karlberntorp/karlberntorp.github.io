---
title: Quadrotor navigation under uncertainty
description: Planning motion through obstacle-filled environments using invariant sets, with analysis, simulation, and Crazyflie quadrotor experiments.
publicationId: Greiff2025jan
youtubeVideoId: ewIcOwDwZC8
videoTitle: Graph-Based Invariant Set Planning for Quadrotors — MERL
videoCaption: "MERL’s demonstration of graph-based invariant-set planning for quadrotors, linked from the journal paper’s MERL publication page."
---

## Problem

A quadrotor cannot follow a planned path exactly. Its controller has tracking error, the dynamics are uncertain, and disturbances affect its motion. A route that avoids obstacles as a line in space may leave too little room for the vehicle's actual response.

The planner accounts for the closed-loop response when choosing margins around obstacles. A model of that response and its uncertainty bounds is used to construct invariant sets and a graph of admissible transitions.

## Approach

The method builds robust positively invariant sets around equilibrium positions. Under the modeled conditions, a trajectory starting inside one of these sets remains within it. The analysis includes uncertainty in the closed-loop gains, bounded attitude-tracking errors, and additive input disturbances.

The sets are computed using linear matrix inequalities and expanded while respecting obstacles and vehicle constraints. Equilibrium positions become graph vertices; admissible transitions between positions become edges. An online graph search selects a sequence of setpoints that moves the quadrotor toward its target within the invariant sets.

The graph is computed offline. Online, the planner searches this graph and issues setpoints. The paper also analyzes finite-time reachability subject to the graph's properties.

## Results and validation

The approach was evaluated through simulations and physical experiments with a Crazyflie 2.1 quadrotor. The figure shows a planned path through obstacles alongside photographs of the indoor course and experimental vehicle.

The analysis establishes safety and reachability under the modeled uncertainty bounds, constraints, and graph assumptions. The indoor experiments demonstrated obstacle-course navigation with the invariant-set planner and onboard controller.
