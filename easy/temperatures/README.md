# Temperatures 

## Description du problème

Analyser un relevé de températures pour **trouver celle qui se rapproche le plus de zéro**. Un défi classique de recherche avec une règle spéciale à gérer !

### Règle critique
**En cas d'égalité de distance**, le nombre **positif** l'emporte !
- Exemple : entre `-5` et `5`, choisir `5`
- Raison : préférence pour les températures "moins extrêmes"

## Format des données

### Entrée
```
Ligne 1: N (nombre de températures)
Ligne 2: N températures séparées par des espaces
```

### Sortie
```
La température la plus proche de 0
Ou 0 si aucune température fournie
```

### Contraintes
- `0 ≤ N < 10000`
- Températures : `-273` à `5526`

## Exemples détaillés

### Exemple 1 : Cas standard
```
Entrée:
5
1 -2 -8 4 5

Analyse:
|1| = 1  ← Plus proche de 0
|-2| = 2
|-8| = 8
|4| = 4
|5| = 5

Sortie: 1
```

### Exemple 2 : Égalité (règle spéciale)
```
Entrée:
2
-5 5

Analyse:
|-5| = 5
|5| = 5   ← Égalité ! Positif gagne

Sortie: 5
```

### Exemple 3 : Zéro présent
```
Entrée:
3
-3 0 2

Analyse:
|-3| = 3
|0| = 0   ← Optimal absolu
|2| = 2

Sortie: 0
```

### Exemple 4 : Aucune température
```
Entrée:
0

Sortie: 0
```

## Stratégie de résolution

### Algorithme principal
1. **Validation :** Si N=0 → retourner 0
2. **Initialisation :** Premier élément comme référence
3. **Parcours :** Pour chaque température suivante
   - Calculer distance absolue
   - Comparer avec la référence actuelle
   - Appliquer règle de priorité positive
4. **Résultat :** Retourner la température optimale

### Fonction de comparaison intelligente
```typescript
function isCloserToZero(candidate: number, current: number): boolean {
    const candidateDistance = Math.abs(candidate);
    const currentDistance = Math.abs(current);
    
    // Distances différentes → prendre la plus petite
    if (candidateDistance !== currentDistance) {
        return candidateDistance < currentDistance;
    }
    
    // Égalité → prendre le positif
    return candidate > current;
}
```

## 🔍 Cas particuliers gérés

| Scénario | Comportement | Exemple |
|----------|--------------|---------|
| **Aucune température** | Retourne `0` | `N=0` → `0` |
| **Une seule température** | Retourne cette température | `[42]` → `42` |
| **Égalité parfaite** | Privilégie le positif | `[-3,3]` → `3` |
| **Zéro présent** | Retourne `0` (optimal) | `[-5,0,3]` → `0` |
| **Tous négatifs** | Le moins négatif | `[-10,-3,-7]` → `-3` |
| **Tous positifs** | Le plus petit positif | `[10,3,7]` → `3` |
