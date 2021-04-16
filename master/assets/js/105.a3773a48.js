(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{685:function(e,t,s){"use strict";s.r(t);var o=s(1),n=Object(o.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"adr-041-in-place-store-migrations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#adr-041-in-place-store-migrations"}},[e._v("#")]),e._v(" ADR 041: In-Place Store Migrations")]),e._v(" "),s("h2",{attrs:{id:"changelog"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),s("ul",[s("li",[e._v("17.02.2021: Initial Draft")])]),e._v(" "),s("h2",{attrs:{id:"status"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),s("p",[e._v("Accepted")]),e._v(" "),s("h2",{attrs:{id:"abstract"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),s("p",[e._v("This ADR introduces a mechanism to perform in-place state store migrations during chain software upgrades.")]),e._v(" "),s("h2",{attrs:{id:"context"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),s("p",[e._v("When a chain upgrade introduces state-breaking changes inside modules, the current procedure consists of exporting the whole state into a JSON file (via the "),s("code",[e._v("simd export")]),e._v(" command), running migration scripts on the JSON file ("),s("code",[e._v("simd migrate")]),e._v(" command), clearing the stores ("),s("code",[e._v("simd unsafe-reset-all")]),e._v(" command), and starting a new chain with the migrated JSON file as new genesis (optionally with a custom initial block height). An example of such a procedure can be seen "),s("a",{attrs:{href:"https://github.com/cosmos/gaia/blob/v4.0.3/docs/migration/cosmoshub-3.md#upgrade-procedure",target:"_blank",rel:"noopener noreferrer"}},[e._v("in the Cosmos Hub 3->4 migration guide"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("p",[e._v("This procedure is cumbersome for multiple reasons:")]),e._v(" "),s("ul",[s("li",[e._v("The procedure takes time. It can take hours to run the "),s("code",[e._v("export")]),e._v(" command, plus some additional hours to run "),s("code",[e._v("InitChain")]),e._v(" on the fresh chain using the migrated JSON.")]),e._v(" "),s("li",[e._v("The exported JSON file can be heavy (~100MB-1GB), making it difficult to view, edit and transfer, which in turn introduces additional work to solve these problems (such as "),s("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/issues/6936",target:"_blank",rel:"noopener noreferrer"}},[e._v("streaming genesis"),s("OutboundLink")],1),e._v(").")])]),e._v(" "),s("h2",{attrs:{id:"decision"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),s("p",[e._v("We propose a migration procedure based on modifying the KV store in-place without involving the JSON export-process-import flow described above.")]),e._v(" "),s("h3",{attrs:{id:"module-consensusversion"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#module-consensusversion"}},[e._v("#")]),e._v(" Module "),s("code",[e._v("ConsensusVersion")])]),e._v(" "),s("p",[e._v("We introduce a new method on the "),s("code",[e._v("AppModule")]),e._v(" interface:")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBBcHBNb2R1bGUgaW50ZXJmYWNlIHsKICAgIC8vIC0tc25pcC0tCiAgICBDb25zZW5zdXNWZXJzaW9uKCkgdWludDY0Cn0K"}}),e._v(" "),s("p",[e._v("This methods returns an "),s("code",[e._v("uint64")]),e._v(" which serves as state-breaking version of the module. It MUST be incremented on each consensus-breaking change introduced by the module. To avoid potential errors with default values, the initial version of a module MUST be set to 1. In the SDK, version 1 corresponds to the modules in the v0.41 series.")]),e._v(" "),s("h3",{attrs:{id:"module-specific-migration-functions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#module-specific-migration-functions"}},[e._v("#")]),e._v(" Module-Specific Migration Functions")]),e._v(" "),s("p",[e._v("For each consensus-breaking change introduced by the module, a migration script from ConsensusVersion "),s("code",[e._v("N")]),e._v(" to version "),s("code",[e._v("N+1")]),e._v(" MUST be registered in the "),s("code",[e._v("Configurator")]),e._v(" using its newly-added "),s("code",[e._v("RegisterMigration")]),e._v(" method. All modules receive a reference to the configurator in their "),s("code",[e._v("RegisterServices")]),e._v(" method on "),s("code",[e._v("AppModule")]),e._v(", and this is where the migration functions should be registered. The migration functions should be registered in increasing order.")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoYW0gQXBwTW9kdWxlKSBSZWdpc3RlclNlcnZpY2VzKGNmZyBtb2R1bGUuQ29uZmlndXJhdG9yKSB7CiAgICAvLyAtLXNuaXAtLQogICAgY2ZnLlJlZ2lzdGVyTWlncmF0aW9uKHR5cGVzLk1vZHVsZU5hbWUsIDEsIGZ1bmMoY3R4IHNkay5Db250ZXh0KSBlcnJvciB7CiAgICAgICAgLy8gUGVyZm9ybSBpbi1wbGFjZSBzdG9yZSBtaWdyYXRpb25zIGZyb20gQ29uc2Vuc3VzVmVyc2lvbiAxIHRvIDIuCiAgICB9KQogICAgIGNmZy5SZWdpc3Rlck1pZ3JhdGlvbih0eXBlcy5Nb2R1bGVOYW1lLCAyLCBmdW5jKGN0eCBzZGsuQ29udGV4dCkgZXJyb3IgewogICAgICAgIC8vIFBlcmZvcm0gaW4tcGxhY2Ugc3RvcmUgbWlncmF0aW9ucyBmcm9tIENvbnNlbnN1c1ZlcnNpb24gMiB0byAzLgogICAgfSkKICAgIC8vIGV0Yy4KfQo="}}),e._v(" "),s("p",[e._v("For example, if the new ConsensusVersion of a module is "),s("code",[e._v("N")]),e._v(" , then "),s("code",[e._v("N-1")]),e._v(" migration functions MUST be registered in the configurator.")]),e._v(" "),s("p",[e._v("In the SDK, the migration functions are handled by each module's keeper, because the keeper holds the "),s("code",[e._v("sdk.StoreKey")]),e._v(" used to perform in-place store migrations. To not overload the keeper, a "),s("code",[e._v("Migrator")]),e._v(" wrapper is used by each module to handle the migration functions:")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gTWlncmF0b3IgaXMgYSBzdHJ1Y3QgZm9yIGhhbmRsaW5nIGluLXBsYWNlIHN0b3JlIG1pZ3JhdGlvbnMuCnR5cGUgTWlncmF0b3Igc3RydWN0IHsKICBCYXNlS2VlcGVyCn0K"}}),e._v(" "),s("p",[e._v("Since migration functions manipulate legacy code, they should live inside the "),s("code",[e._v("legacy/")]),e._v(" folder of each module, and be called by the Migrator's methods. We propose the format "),s("code",[e._v("Migrate{M}to{N}")]),e._v(" for method names.")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gTWlncmF0ZTF0bzIgbWlncmF0ZXMgZnJvbSB2ZXJzaW9uIDEgdG8gMi4KZnVuYyAobSBNaWdyYXRvcikgTWlncmF0ZTF0bzIoY3R4IHNkay5Db250ZXh0KSBlcnJvciB7CglyZXR1cm4gdjA0M2JhbmsuTWlncmF0ZVN0b3JlKGN0eCwgbS5rZWVwZXIuc3RvcmVLZXkpIC8vIHYwNDNiYW5rIGlzIHBhY2thZ2UgYHgvYmFuay9sZWdhY3kvdjA0M2AuCn0K"}}),e._v(" "),s("p",[e._v("Each module's migration functions are specific to the module's store evolutions, and are not described in this ADR. An example of x/bank store key migrations after the introduction of ADR-028 length-prefixed addresses can be seen in this "),s("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/36f68eb9e041e20a5bb47e216ac5eb8b91f95471/x/bank/legacy/v043/store.go#L41-L62",target:"_blank",rel:"noopener noreferrer"}},[e._v("store.go code"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"tracking-module-versions-in-x-upgrade"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tracking-module-versions-in-x-upgrade"}},[e._v("#")]),e._v(" Tracking Module Versions in "),s("code",[e._v("x/upgrade")])]),e._v(" "),s("p",[e._v("We introduce a new prefix store in "),s("code",[e._v("x/upgrade")]),e._v("'s store. This store will track each module's current version, it can be modelized as a "),s("code",[e._v("map[string]uint64")]),e._v(" of module name to module ConsensusVersion, and will be used when running the migrations (see next section for details). The key prefix used is "),s("code",[e._v("0x1")]),e._v(", and the key/value format is:")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"MHgyIHwge2J5dGVzKG1vZHVsZV9uYW1lKX0gPSZndDsgQmlnRW5kaWFuKG1vZHVsZV9jb25zZW5zdXNfdmVyc2lvbikK"}}),e._v(" "),s("p",[e._v("The initial state of the store is set from "),s("code",[e._v("app.go")]),e._v("'s "),s("code",[e._v("InitChainer")]),e._v(" method.")]),e._v(" "),s("p",[e._v("The UpgradeHandler signature needs to be updated to take a "),s("code",[e._v("VersionMap")]),e._v(", as well as return an upgraded "),s("code",[e._v("VersionMap")]),e._v(" and an error:")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"diff",base64:"LSB0eXBlIFVwZ3JhZGVIYW5kbGVyIGZ1bmMoY3R4IHNkay5Db250ZXh0LCBwbGFuIFBsYW4pCisgdHlwZSBVcGdyYWRlSGFuZGxlciBmdW5jKGN0eCBzZGsuQ29udGV4dCwgcGxhbiBQbGFuLCB2ZXJzaW9uTWFwIFZlcnNpb25NYXApIChWZXJzaW9uTWFwLCBlcnJvcikK"}}),e._v(" "),s("p",[e._v("To apply an upgrade, we query the "),s("code",[e._v("VersionMap")]),e._v(" from the "),s("code",[e._v("x/upgrade")]),e._v(" store and pass it into the handler. The handler runs the actual migration functions (see next section), and if successful, returns an updated "),s("code",[e._v("VersionMap")]),e._v(" to be stored in state.")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"diff",base64:"ZnVuYyAoayBVcGdyYWRlS2VlcGVyKSBBcHBseVVwZ3JhZGUoY3R4IHNkay5Db250ZXh0LCBwbGFuIHR5cGVzLlBsYW4pIHsKICAgIC8vIC0tc25pcC0tCi0gICBoYW5kbGVyKGN0eCwgcGxhbikKKyAgIHVwZGF0ZWRWTSwgZXJyIDo9IGhhbmRsZXIoY3R4LCBwbGFuLCBrLkdldE1vZHVsZVZlcnNpb25NYXAoY3R4KSkgLy8gay5HZXRNb2R1bGVWZXJzaW9uTWFwKCkgZmV0Y2hlcyB0aGUgVmVyc2lvbk1hcCBzdG9yZWQgaW4gc3RhdGUuCisgICBpZiBlcnIgIT0gbmlsIHsKKyAgICAgICByZXR1cm4gZXJyCisgICB9CisKKyAgIC8vIFNldCB0aGUgdXBkYXRlZCBjb25zZW5zdXMgdmVyc2lvbnMgdG8gc3RhdGUKKyAgIGsuU2V0TW9kdWxlVmVyc2lvbk1hcChjdHgsIHVwZGF0ZWRWTSkKfQo="}}),e._v(" "),s("p",[e._v("A gRPC query endpoint to query the "),s("code",[e._v("VersionMap")]),e._v(" stored in "),s("code",[e._v("x/upgrade")]),e._v("'s state will also be added, so that app developers can double-check the "),s("code",[e._v("VersionMap")]),e._v(" before the upgrade handler runs.")]),e._v(" "),s("h3",{attrs:{id:"running-migrations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#running-migrations"}},[e._v("#")]),e._v(" Running Migrations")]),e._v(" "),s("p",[e._v("Once all the migration handlers are registered inside the configurator (which happens at startup), running migrations can happen by calling the "),s("code",[e._v("RunMigrations")]),e._v(" method on "),s("code",[e._v("module.Manager")]),e._v(". This function will loop through all modules, and for each module:")]),e._v(" "),s("ul",[s("li",[e._v("Get the old ConsensusVersion of the module from its "),s("code",[e._v("VersionMap")]),e._v(" argument (let's call it "),s("code",[e._v("M")]),e._v(").")]),e._v(" "),s("li",[e._v("Fetch the new ConsensusVersion of the module from the "),s("code",[e._v("ConsensusVersion()")]),e._v(" method on "),s("code",[e._v("AppModule")]),e._v(" (call it "),s("code",[e._v("N")]),e._v(").")]),e._v(" "),s("li",[e._v("If "),s("code",[e._v("N>M")]),e._v(", run all registered migrations for the module sequentially "),s("code",[e._v("M -> M+1 -> M+2...")]),e._v(" until "),s("code",[e._v("N")]),e._v(".\n"),s("ul",[s("li",[e._v("There is a special case where there is no ConsensusVersion for the module, as this means that the module has been newly added during the upgrade. In this case, no migration function is run, and the module's current ConsensusVersion is saved to "),s("code",[e._v("x/upgrade")]),e._v("'s store.")])])])]),e._v(" "),s("p",[e._v("If a required migration is missing (e.g. if it has not been registered in the "),s("code",[e._v("Configurator")]),e._v("), then the "),s("code",[e._v("RunMigrations")]),e._v(" function will error.")]),e._v(" "),s("p",[e._v("In practice, the "),s("code",[e._v("RunMigrations")]),e._v(" method should be called from inside an "),s("code",[e._v("UpgradeHandler")]),e._v(".")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"YXBwLlVwZ3JhZGVLZWVwZXIuU2V0VXBncmFkZUhhbmRsZXIoJnF1b3Q7bXktcGxhbiZxdW90OywgZnVuYyhjdHggc2RrLkNvbnRleHQsIHBsYW4gdXBncmFkZXR5cGVzLlBsYW4sIHZtIG1vZHVsZS5WZXJzaW9uTWFwKSAgKG1vZHVsZS5WZXJzaW9uTWFwLCBlcnJvcikgewogICAgcmV0dXJuIGFwcC5tbS5SdW5NaWdyYXRpb25zKGN0eCwgdm0pCn0pCg=="}}),e._v(" "),s("p",[e._v("Assuming a chain upgrades at block "),s("code",[e._v("n")]),e._v(", the procedure should run as follows:")]),e._v(" "),s("ul",[s("li",[e._v("the old binary will halt in "),s("code",[e._v("BeginBlock")]),e._v(" when starting block "),s("code",[e._v("N")]),e._v(". In its store, the ConsensusVersions of the old binary's modules are stored.")]),e._v(" "),s("li",[e._v("the new binary will start at block "),s("code",[e._v("N")]),e._v(". The UpgradeHandler is set in the new binary, so will run at "),s("code",[e._v("BeginBlock")]),e._v(" of the new binary. Inside "),s("code",[e._v("x/upgrade")]),e._v("'s "),s("code",[e._v("ApplyUpgrade")]),e._v(", the "),s("code",[e._v("VersionMap")]),e._v(" will be retrieved from the (old binary's) store, and passed into the "),s("code",[e._v("RunMigrations")]),e._v(" functon, migrating all module stores in-place before the modules' own "),s("code",[e._v("BeginBlock")]),e._v("s.")])]),e._v(" "),s("h2",{attrs:{id:"consequences"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),s("h3",{attrs:{id:"backwards-compatibility"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#backwards-compatibility"}},[e._v("#")]),e._v(" Backwards Compatibility")]),e._v(" "),s("p",[e._v("This ADR introduces a new method "),s("code",[e._v("ConsensusVersion()")]),e._v(" on "),s("code",[e._v("AppModule")]),e._v(", which all modules need to implement. It also alters the UpgradeHandler function signature. As such, it is not backwards-compatible.")]),e._v(" "),s("p",[e._v("While modules MUST register their migration functions when bumping ConsensusVersions, running those scripts using an upgrade handler is optional. An application may perfectly well decide to not call the "),s("code",[e._v("RunMigrations")]),e._v(" inside its upgrade handler, and continue using the legacy JSON migration path.")]),e._v(" "),s("h3",{attrs:{id:"positive"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),s("ul",[s("li",[e._v("Perform chain upgrades without manipulating JSON files.")]),e._v(" "),s("li",[e._v("While no benchmark has been made yet, it is probable that in-place store migrations will take less time than JSON migrations. The main reason supporting this claim is that both the "),s("code",[e._v("simd export")]),e._v(" command on the old binary and the "),s("code",[e._v("InitChain")]),e._v(" function on the new binary will be skipped.")])]),e._v(" "),s("h3",{attrs:{id:"negative"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),s("ul",[s("li",[e._v("Module developers MUST correctly track consensus-breaking changes in their modules. If a consensus-breaking change is introduced in a module without its corresponding "),s("code",[e._v("ConsensusVersion()")]),e._v(" bump, then the "),s("code",[e._v("RunMigrations")]),e._v(" function won't detect the migration, and the chain upgrade might be unsuccessful. Documentation should clearly reflect this.")])]),e._v(" "),s("h3",{attrs:{id:"neutral"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")]),e._v(" "),s("ul",[s("li",[e._v("The SDK will continue to support JSON migrations via the existing "),s("code",[e._v("simd export")]),e._v(" and "),s("code",[e._v("simd migrate")]),e._v(" commands.")]),e._v(" "),s("li",[e._v("The current ADR does not allow creating, renaming or deleting stores, only modifying existing store keys and values. The SDK already has the "),s("code",[e._v("StoreLoader")]),e._v(" for those operations.")])]),e._v(" "),s("h2",{attrs:{id:"further-discussions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#further-discussions"}},[e._v("#")]),e._v(" Further Discussions")]),e._v(" "),s("h2",{attrs:{id:"references"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),s("ul",[s("li",[e._v("Initial discussion: https://github.com/cosmos/cosmos-sdk/discussions/8429")]),e._v(" "),s("li",[e._v("Implementation of "),s("code",[e._v("ConsensusVersion")]),e._v(" and "),s("code",[e._v("RunMigrations")]),e._v(": https://github.com/cosmos/cosmos-sdk/pull/8485")]),e._v(" "),s("li",[e._v("Issue discussing "),s("code",[e._v("x/upgrade")]),e._v(" design: https://github.com/cosmos/cosmos-sdk/issues/8514")])])],1)}),[],!1,null,null,null);t.default=n.exports}}]);