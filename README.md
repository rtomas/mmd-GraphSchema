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
Block --o Transaction : transactions
Token --o Account : owner
Account --o Token : tokens
Transaction --o Block : block
ERC721Transaction --o Account : from
ERC721Transaction --o Account : to
ERC721Transaction --o TranasctionType : type
ERC721Transaction --o Block : block
Burn --o Token : token
Burn --o Account : from
Burn --o Account : to
Burn --o Block : block
Burn --o TranasctionType : type
ERC721Transaction <|-- Burn
Mint --o Token : token
Mint --o Account : from
Mint --o Account : to
Mint --o Block : block
Mint --o TranasctionType : type
ERC721Transaction <|-- Mint
Transfer --o Token : token
Transfer --o Account : from
Transfer --o Account : to
Transfer --o Block : block
Transfer --o TranasctionType : type
ERC721Transaction <|-- Transfer
```
Image Example
