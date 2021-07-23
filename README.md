# Npm Update Action

This action is meant to update your npm dependencies using your workflow tokens.

V1 is very naive and works in my specific setup. It performs `npm install --ignore-scripts && npm update` to bump both `package.json` and `package-lock.json`. If there's a simple way to do them both _in a single step_ or _without_ actually downloading the dependencies, I'm all 👂. In the another version, I'd perhaps use `npm outdated` or some other way to achieve this.

The idea is that you have a daily scheduled workflow with write permission to the repo. You add this as a second step after checking out the codebase (or 3rd if you set up Node explicitly). Then you add your usual build steps, all the tests and whatnot. The action will then commit the update *if* the checks were successful. It's using `post` and `post-if` action configuration to do this automatically, there's no need to add anything at the end. See [example workflow](.github/workflows/test.yaml) or below:

```yaml
name: Update dependencies
on:
  workflow_dispatch:
  schedule:
    - cron: '9 9 * * 1-5' # 9:09 every week day

jobs:
  Update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout the action codebase
        uses: actions/checkout@v2
      - name: Update!
        uses: oshdev/npm-update-action@v1
      - name: Test
        run: npm test
```

Note: I haven't tested this with multi-job workflow. Especially if you use `continue-on-error: true` not sure how it would behave overall.

#### Planned features (in no specific priority order):
- tests (lol) trust me when I say I tend to TDD, but that was meant to be a quick hack that just somewhat escalated when I was experimenting with various stuff
- related to the above, using the [Toolkit](https://github.com/actions/toolkit)
- stop pipeline from executing when no changes were detected
- ability to update major versions
- configurable git user and email
- list updates done
- confirmation before committing and pushing
- more...

### Contributing

I'm looking to expand this to work in a more generic fashion with a bunch of configurable settings.

If you're willing to do anything of the below to make it work with your workflow or if you have any idea whatsoever, feel free to raise a PR or and issue.
