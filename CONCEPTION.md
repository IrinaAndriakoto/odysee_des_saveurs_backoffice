##### **CONCEPTION** : 

nb: 
Isaky ny reservation confirmé de mi assigner table en fonction an'ny nb place sy ny date ( select from reservation where table != dispo on date choisie ) 



###### **Users** {

&nbsp;	firstname, lastname, username, password

}

###### **dishes** { 

&nbsp;	desc , img , nom , prix

}

###### **Reservations** { 

&nbsp;	...

}

###### **Avis** {

&nbsp;	date publication, emailuser, username, avis

}

###### **Stock {**

	id, produit\_nom, quantite, date\_insertion, 

**}**

**Personnel {**

	nom,prenom,adresse,num,salaire,,date\_embauche,photo

**}**

**Table{**

	idtable, table, nb\_place, dispo(bool)

**}**

**Commandes {**

	idcommande, num\_table, dishes\[ ] ( Mamoaka prix anaovana stats )

**}**

