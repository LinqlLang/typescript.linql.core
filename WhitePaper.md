# Linql: A Next-Generation, Language-Native Graph Api Language
##### Kris Sodroski (2023)  

## Introduction 


Since the inception of the internet, computer to computer communications have been the cornerstone of technological advancement.  Up until the 1990s, network communications were complex and almost exclusively limited to advanced users, corporations, and governments.  

The introduction of interactive websites - programmed in `javascript` and communicating over `HTTP` -  ushered in the `cyber revolution`.  By hiding complex communication protocols behind graphical user interfaces (`GUIs`) connected to web services (`APIs`), `web application` architecture has inanarguably been foundational to humankind's rapid progress.  While `web application` implementations and programming principals have undoubtably been successful, their influence has also created significant communication fragmentation and inefficiencies across all of computing. 

Over the years, there have been many attempts at standardizing communication protocols, each with their own advantages and disadvantages.  This paper will explore many of these protocols from the `perspective of the author`, and propose an alternative protocol, `Linql`, that aims to provide significant advantages and efficiencies over existing methodolgies.

## The Beginnings - XHR Requests

The beginning years of `web applications` relied heavily on `XHR`, typically utilizing `XML` based requests and responses to drive their web `GUIs`.  Lacking any best practices, `APIs` designed to receive and deliver this data typically contained individually crafted request and response structures and endpoints.

Over the years, architectural tastes changed, such as preferring `JSON` over `XML`, standardizing data delivery, but `custom endpoint implementations` continued to reign, ultimately continuing communication fragmentation. 

## The Silver Bullet - REST 

In the early 2000s, representational state transfer (`REST`) was introduced in an attempt to standardize request and response design across the web.  While fundamentally helpful as a guideline, `REST`'s non-specific constraints caused many unintended consequences.    

`REST` emphasizes that compliant servers should have a `uniform interface` defined by [four constraints](https://en.wikipedia.org/wiki/Representational_state_transfer#Uniform_interface).  Of these constraints, `resource identification in requests` has had the most detrimental impact on interoperability across the web. 

Without an explicitly stated implementation, `REST` architectures evolved to mirror `HTTP` resource requests, with `data access` exclusively being performed through `HTTP GET` with user defined `filters` in the `query string`.

Despite `REST`'s efforts to reduce complexity and create a generic multipurpose interface, the complexity of modern web capabilities elucidate foundational issues with it's design. 

### 1. Primary Key Filtering 

At first glance, `resource identification in requests` seems to provide an common interface for `Types` based on their `uniqueness`. 

Imagine I have the following data model with a `unique identifier`: 

```typescript
class TestObject 
{
    ID: number;
}
```

Filtering to get a specific `TestObject` by it's `ID` is relatively simple.

```powershell
curl GET /TestObject/{ID}
```

By adding a `composite unique identifier`, a common scenario for complex applications, a significant issue arrises. 

```typescript
class TestObject 
{
    ID-1: number;
    ID-2: number;
}
```

In this case, which is the correct order? 

```powershell
curl GET /TestObject/{ID-1}/{ID-2}
curl GET /TestObject/{ID-2}/{ID-1}
```

While extreme, imagine there were `N` unique identifiers.  How would `REST` handle this situation? 

```typescript
class TestObject 
{
    ID-1: number;
    ID-2: number;
    ...
    ID-N: number;
}
```

```powershell
curl GET /TestObject/{ID-1}/{ID-2}/.../{ID-N}
```

### 2. Property Filtering

### 3. URL Max Length Limitations

### 4. One-to-One Development

#### 5. N+1 Data Requests

#### 6. Request Queue Bottleneck 