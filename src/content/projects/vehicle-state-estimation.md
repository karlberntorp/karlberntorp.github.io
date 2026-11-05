---
title: Estimating vehicle motion when wheels slip
description: Combining inertial, GPS, and wheel-speed measurements to estimate vehicle motion and individual wheel slip during demanding driving maneuvers.
publicationId: Berntorp2016e
---

## Problem

Wheel rotation is useful for estimating how fast a vehicle is moving, but the relationship changes when a tire slips. During braking and cornering, treating wheel speed as ground speed can give a misleading picture of the vehicle's motion. Controllers that depend on that picture need estimates that account for slip as well as the vehicle's movement.

This work studies how to estimate both quantities together using wheel encoders, an inertial measurement unit, and GPS. The aim is to combine complementary measurements into a consistent account of the vehicle state, including periods when GPS is unavailable.

## Approach

The method uses a Rao–Blackwellized particle filter with a kinematic vehicle model. The filter exploits conditional linearity to reduce the part of the estimation problem handled by particles.

The estimated variables include longitudinal velocity, roll angle, and slip at all four wheels. Estimating motion and slip jointly allows the method to account for the changing relationship between wheel rotation and vehicle movement.

## Results and validation

Field tests evaluated wheel-slip and velocity estimates against reference measurements during simultaneous aggressive braking and cornering. A double lane-change maneuver also demonstrated velocity and slip estimation during a GPS outage.
