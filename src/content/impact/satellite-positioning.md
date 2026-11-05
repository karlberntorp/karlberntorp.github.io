---
title: Developing centimeter-level satellite positioning
description: A Bayesian satellite-positioning algorithm developed at MERL and implemented in C demonstrated less than 3 cm positioning error over 24 hours in experiments on customer data.
impactId: satellite-positioning
---

## Challenge

Carrier-phase GNSS measurements support precise positioning, but the receiver must resolve an unknown number of complete signal cycles. These integer ambiguities can change when a cycle slip occurs. The estimator needs to handle those changes while tracking the receiver's motion.

## Approach and contribution

At Mitsubishi Electric Research Laboratories, I designed and analyzed a Bayesian satellite-positioning algorithm and implemented it in C. The implementation was evaluated in experiments on customer data.

## Results

Experiments on customer data demonstrated positioning error below 3 cm over a 24-hour period.

## Related research

[Integer Ambiguity Resolution by Mixture Kalman Filter for Improved GNSS Precision](/publications/#Berntorp2020feb) describes a related method for integer ambiguity resolution and cycle-slip handling. The paper reports numerical tests and an experimental evaluation distinct from the customer-data result above.
