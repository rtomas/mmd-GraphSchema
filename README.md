Create a Mermaid file from a schema.graphql from a subgraph for the graph protocol.

1.  npm install -g .

2.  go to schema.graphql directory and run
    mmdSchema

3.  schema.mmd created

4.  Add the Image to the README subgraph in github :)
by using 
``````
```mermaid

... <<include text generated in schema.mdd>>

```
``````
---

Another option is to copy the graphql.schema into the root of project an run

node .

Image Example

```mermaid
classDiagram
class VisitorsInfo { 
	ID! id 
	BigInt! numTokens 
	BigInt! numOwners 
	BigInt! numAccounts 
	BigInt! lastMintDate 
	BigInt! lastTransferDate 
	BigInt! lastBurned 
}
class Block { 
	ID! id 
	BigInt! timestamp 
	BigInt! number 
	[Transaction!] transactions 
}
class Token { 
	ID! id 
	BigInt! tokenID 
	Account! owner 
	String! uri 
	BigInt! mintTime 
	Bytes! transaction 
	Boolean burned 
}
class Account { 
	ID! id 
	Bytes! address 
	[Token!]! tokens 
	BigInt! numTokens 
}
class TranasctionType { 
	<<enumeration>>
	MINT 
	BURN 
	TRANSFER 
}
class Transaction { 
	ID! id 
	Block! block 
	BigInt! gasPrice 
	BigInt! gasLimit 
}
class ERC721Transaction { 
	<<interface>>
	ID! id 
	Account from 
	Account to 
	TranasctionType! type 
	Block! block 
}
class Burn { 
	ID! id 
	Token! token 
	Account from 
	Account to 
	Bytes! transaction 
	Block! block 
	TranasctionType! type 
}
class Mint { 
	ID! id 
	Token! token 
	Account from 
	Account to 
	Bytes! transaction 
	Block! block 
	TranasctionType! type 
}
class Transfer { 
	ID! id 
	Token! token 
	Account from 
	Account to 
	Bytes! transaction 
	Block! block 
	TranasctionType! type 
}
Block--Transaction
Token--Account
Account--Token
Transaction--Block
ERC721Transaction--Account
ERC721Transaction--TranasctionType
ERC721Transaction--Block
Burn--Token
Burn--Account
Burn--Block
Burn--TranasctionType
Mint--Token
Mint--Account
Mint--Block
Mint--TranasctionType
Transfer--Token
Transfer--Account
Transfer--Block
Transfer--TranasctionType
