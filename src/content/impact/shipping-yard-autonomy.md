---
title: Planning and control for shipping-yard autonomy
description: Particle-filter motion planning and model-predictive control for automated shipping-yard tractors, developed at MERL as part of a commercial customer program.
impactId: shipping-yard-autonomy
---

## Challenge

An articulated vehicle must account for both tractor and trailer motion. Tight maneuvers can require changes between forward and reverse motion, while steering decisions affect the vehicle's entire configuration. The planner needs to find a feasible path, and the controller needs to track it within the available space.

## Approach and contribution

At Mitsubishi Electric Research Laboratories, I developed the particle-filter motion planner and co-developed the control architecture and model-predictive controller for automated shipping-yard tractors. The work included implementation on a dSPACE SCALEXIO platform and contributed to the development of a commercial customer system.

Particle filtering generates and evaluates candidate vehicle motions. The model-predictive controller tracks planned maneuvers while accounting for vehicle dynamics and constraints.

## Results

The related active-trailer-steering planning work was evaluated in closed-loop simulations. The integral-action controller was evaluated in hardware-in-the-loop simulations using dSPACE SCALEXIO, including tight maneuvers and changes in driving direction.

## Related research

- [Motion Planning of Articulated Vehicles with Active Trailer Steering by Particle Filtering](/publications/#Iqbal2023aug)
- [Integral Action NMPC for Tight Maneuvers of Articulated Vehicles](/publications/#You2023may)
