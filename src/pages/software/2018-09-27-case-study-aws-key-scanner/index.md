---
layout: post
category: "Software"
date: 2018-09-27
tags:
- aws
- security
title: "Case Study: Devastating work of a malicious GitHub bot"
---

A while back I was working for a mid-size client who used AWS as their infrastructure provider. For a long time, there had been little governance over the AWS account, with development teams having full access to the account functions and often provisioning their applications manually. As the cumulative ecosystem of the organization grew to around 300 EC2 instance, manual provisioning was being gradually phased out across teams in favor of automation, thanks to services like CloudFormation, Elastic Beanstalk and Ansible, however originally set privileges remained still in place.

On one occasion, a set of AWS access keys accidentally leaked to a public GitHub repository, which brought a devastating result, as a malicious bot finds them and wreaks havoc across the organization.

# Timeline

Below is the timeline of the incident, relative to the first event (timestamps in hh:mm format)

## 00:00
AWS Key ID and Secret ID are published to a developer's personal public repository on GitHub

## 00:01
Less than a *minute* later, a malicious bot scanning GitHub repositories finds the published keys. Using the keys, it creates its own AWS user with high privileges within the AWS account, that it then uses for all subsequent actions. The first task is to remove all existing users and disable existing access keys.

At this point, the organization loses control over the account, however is not yet aware of it.

## 00:02
AWS Security team notifies the company's IT team over email of a potential account compromise. The team confirms it and with the help of AWS, recovers access to the account. There is much confusion about what has happened and what the impact is. There is no knowledge of the newly created malicious user and the actions it is invoking.

## 00:42
The bot starts deleting EC2 instances. To accomplish this task, it spins off a lambda, that performs this 'clean-up' of resources from the inside.

## 00:48
All EC2 instances have been removed. The bot now attempts to spin up new instances (likely for the purpose of mining bitcoins), however is blocked by AWS's malicious behavior recognition mechanism. True war of the machines!

## 00:50
The IT team detects the malicious user and deletes it. From this point on, a long, difficult and highly manual recovery process takes place.

# Impact

## Production downtime
All production systems were impacted with downtime. Out of a total of 15 production applications, about a third was recovered on the same day, with the rest being unavailable for up to 3 days. The most problematic have been legacy services, in maintenance mode for more than a year, deployed manually. For some of them, the necessary skills were not present in the team anymore.

## Sensitive data
No sensitive data was been compromised during the incident. Given the breath of the privileges captured by the malicious bot, it can be considered luck, rather than anything else. Likely, stealing data was not the attackers focus.

## Slowdown
The incident caused a major disruption across all the teams, randomizing ongoing development and diverting resources towards analysis and recovery efforts. Additionally, for weeks to come, teams would be stumbling on some test services still not recovered after the incident. This would lower productivity for many weeks.

# Lessons learned

## Embrace human error
It is tempting to blame the individual who leaked the access keys to the wide internet, however it is not productive. Mistakes are in our nature and rather than wasting energy on trying to eliminate them, use this opportunity to establish guardrails, so it's easier to do the right things.

## Least privilege principle
While I'm not a fan of overly focusing on preventive measures, as they tend to result in point solutions - disproportionately favoring the case at hand, which over time result in over complex systems. However, there are well established security patterns, which should be followed. One of them is the 'Principle of Least Privilege', which requires that users and services can access only the resources they absolutely need.

## Fire drills
Prevention, while a good driver for constant improvement, will never fully eliminate incidents. Therefore, prioritizing Mean Time to Repair (MTTR) over Mean Time Between Failures (MTBF) yields better results. Employing tools like Chaos Monkeys on a daily basis or holding annual 'war games', where various attack scenarios can be played will help this cause. Be sure to include all the services, especially the legacy ones.This is also a good opportunity to evolve and document recovery processes and ensure proper communication channels within the organization are readily available.

## Legacy services
Adopt a more aggressive strategy towards legacy services. Either spent the effort to phase them out completely or invest in automation. Being in a state of limbo - little automation or monitoring around old services and lack of solid plan for sun setting is common and puts the organizations at a very vulnerable position.

## Ensure complete recovery
Naturally production apps, impacting real users take priority when performing recovery. Reaching 'green' state for all the production services is however not sufficient. It's important to recover all components of the ecosystem, that participate in the full development cycle. Think test services, CI agent pools, build monitors, etc. Without this work being prioritized, team's productivity will be taking unexpected hits over many weeks to come.