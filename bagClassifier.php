<?php
const LIMITS = [
    'XL' => 70,
    'L' => 50,
    'M' => 30,
    'S' => 20,
];

$userInput = (int) readline('Enter bag weight: ');

echo classifyByWeight($userInput, LIMITS);

function classifyByWeight($bagWeight, $limits)
{
    // make sure the maximum allowed is at the end of the array
    asort($limits);
    // check if weight is over the limit
    if ($bagWeight > end($limits)) return "Bag weight of " . $bagWeight . " is not allowed!";
    // return the class
    foreach ($limits as $class => $weight) {
        if ($bagWeight <= $weight) return "Bag weight of " . $bagWeight . " is class " . $class;
    }
}