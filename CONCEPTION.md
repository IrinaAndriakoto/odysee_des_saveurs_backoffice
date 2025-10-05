##### **CONCEPTION** : 

**TODO :** 
- CRUD
---

**nb:** 
Isaky ny reservation confirmé de mi assigner table en fonction an'ny nb place sy ny date ( select from reservation where table != dispo on date choisie ) 



**Users : id, firstname, lastname, username, password**



**Personnel : id, nom, prenom, adresse, numero\_tel, salaire, date\_embauche, photo, rôle**



**Table : idtable, nom\_table, nb\_place, dispo**



**Dishes : id, nom, description, image, prix, dispo**



**Reservation : idreservation, id\_user, id\_table, date, status**



**Commande : idcommande, id\_table, id\_user, date, status**



**Commande\_Dishes : id\_commande, id\_dish, quantite, prix**



**Stock : id, produit\_nom, quantite, date\_insertion**



**Avis : id\_avis, id\_dish, id\_user, date\_pub, commentaire, note**



**Media : id, chemin, type, id\_liant (utilisé pour images associées à autre entité)**

