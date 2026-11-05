---
title: Tracking a path as road conditions change
description: Adapting vehicle state estimation and predictive control to changing tire–road friction, with simulation, processor testing, and preliminary snow-track experiments.
publicationId: Berntorp2020jan
---

## Problem

A vehicle controller needs to predict how steering and acceleration will change the vehicle's motion. Those predictions depend on the forces between the tires and the road. A model that works on asphalt can become a poor guide on snow, even when the requested path has not changed. The engineering challenge is to adapt the predictions while continuing to control the vehicle.

Learning a complete tire-force model directly from driving data presents a difficulty: revealing the tire's behavior near its limits can require maneuvers that are undesirable before the controller has a reliable model. The study addresses this tension between identifying the dynamics and using them for control.

## Approach

The method combines nonlinear model predictive control with a noise-adaptive particle filter. The filter estimates vehicle state and tire stiffness from measurements. The controller uses these estimates to select a tire model from a predefined library.

The stiffness estimate describes the approximately linear part of the tire response during normal driving. A relationship between that stiffness and the nonlinear tire behavior guides the selection of a full model from the library. The predictive controller uses the selected model when calculating its next control action.

## Results and validation

The paper evaluates the method through simulation with real vehicle parameters, tests real-time feasibility on automotive-grade processors using a rapid-prototyping unit, and reports preliminary experiments on a snow-covered test track.

The figure shows one experimental double lane change. In that test, the friction-adaptive controller followed the reference more closely than the controller using an asphalt tire model.
